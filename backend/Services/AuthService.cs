using BugDetectorGP.Dto;
using BugDetectorGP.Models.user;
using BugDetectorGP.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Runtime.InteropServices;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
namespace BugDetectorGP.Services
{
    public class AuthService: IAuthService
    {
        private readonly UserManager<UserInfo> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _jwt;

        public AuthService(UserManager<UserInfo> _userManager, IConfiguration _jwt,RoleManager<IdentityRole> roleManager)
        {
            this._userManager = _userManager;
            this._jwt = _jwt;
            _roleManager = roleManager;
        }
        public async Task<AuthModel> RegisterAsync(RegisterUser model)
        {
            if (await _userManager.FindByEmailAsync(model.Email) is not null)
                return new AuthModel {IsAuthenticated=false, message = "Email is already registered!" };

            if (await _userManager.FindByNameAsync(model.UserName) is not null)
                return new AuthModel {IsAuthenticated=false, message = "Username is already registered!" };

            var user = new UserInfo
            {
                UserName = model.UserName,
                Email = model.Email
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                var errors = string.Empty;

                foreach (var error in result.Errors)
                    errors += $"{error.Description},";

                return new AuthModel {IsAuthenticated=false, message = errors };
            }
            var added=await _userManager.AddToRoleAsync(user, "FreeUser");
          

            var jwtSecurityToken = await CreateJwtToken(user);

            var refreshToken = GenerateRefreshToken();
            user.RefreshTokens?.Add(refreshToken);
            await _userManager.UpdateAsync(user);

            return new AuthModel
            {
                message = "Register successful",
                Email = user.Email,
                ExpireOn = jwtSecurityToken.ValidTo,
                IsAuthenticated = true,
                Roles = new List<string> { "FreeUser" },
                Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken),
                UserName = user.UserName,
                RefreshToken = refreshToken.Token,
                RefreshTokenExpiration = refreshToken.ExpiresOn
            };
        }

        public async Task<AuthModel> LoginAsync(LoginUser model)
        {
            var authModel = new AuthModel();
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user is null || !await _userManager.CheckPasswordAsync(user, model.Password))
            {
                authModel.message = "Email or Password is incorrect!";
                return authModel;
            }
            var jwtSecurityToken = await CreateJwtToken(user);
            var rolesList = await _userManager.GetRolesAsync(user);

            authModel.message = "Login successful";
            authModel.IsAuthenticated = true;
            authModel.Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
            authModel.Email = model.Email;
            authModel.UserName = user.UserName;
            authModel.ExpireOn = jwtSecurityToken.ValidTo;
            authModel.Roles = rolesList.ToList();
            if(user.RefreshTokens.Any(t=>t.IsActive))
            {
                var ActiveRefreshToken = user.RefreshTokens.FirstOrDefault(t => t.IsActive);
                authModel.RefreshToken = ActiveRefreshToken.Token;
                authModel.RefreshTokenExpiration = ActiveRefreshToken.ExpiresOn;
            }
            else
            {
                var refreshToken = GenerateRefreshToken();
                authModel.RefreshToken = refreshToken.Token;
                authModel.RefreshTokenExpiration=refreshToken.ExpiresOn;
                user.RefreshTokens.Add(refreshToken);
                await _userManager.UpdateAsync(user);
            }
            return authModel;
        }
        public async Task<bool> LogoutAsync(string token)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == token));
            if (user == null)
            {
                return false;
            }

            var refreshToken = user.RefreshTokens.Single(t => t.Token == token);
            if (!refreshToken.IsActive)
                return false;

            refreshToken.RevokedOn = DateTime.UtcNow.ToLocalTime();
            await _userManager.UpdateAsync(user);
            return true;
        }
        public async Task<string> AddRoleAsync(AddRoleModel model)
        {
            var user = await _userManager.FindByIdAsync(model.UserId);

            if (user is null || !await _roleManager.RoleExistsAsync(model.Role))
                return "Invalid user ID or Role";

            if (await _userManager.IsInRoleAsync(user, model.Role))
                return "User already assigned to this role";

            var result = await _userManager.AddToRoleAsync(user, model.Role);

            return result.Succeeded ? string.Empty : "Sonething went wrong";
        }
        private async Task<JwtSecurityToken> CreateJwtToken(UserInfo user)
        {
            var userClaims = await _userManager.GetClaimsAsync(user);
            var roles = await _userManager.GetRolesAsync(user);
            var roleClaims = new List<Claim>();

            foreach (var role in roles)
                roleClaims.Add(new Claim("roles", role));

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("uid", user.Id)
            }
            .Union(userClaims)
            .Union(roleClaims);

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt["JWT:Key"]));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            var jwtSecurityToken = new JwtSecurityToken(
                issuer: _jwt["JWT:Issuer"],
                audience: _jwt["JWT:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(30),
                signingCredentials: signingCredentials);

            return jwtSecurityToken;
        }
        public async Task<AuthModel> RefreshTokenAsync(string token)
        {
            var authmodel=new AuthModel();
            var user=await _userManager.Users.SingleOrDefaultAsync(u=>u.RefreshTokens.Any(t=>t.Token==token));
            if(user==null)
            { 
                authmodel.message = "Invalid Token";
                return authmodel;
            }
            var refreshToken = user.RefreshTokens.Single(t => t.Token == token);
           if(!refreshToken.IsActive)
            {
                authmodel.message = "InActive Token";
                return authmodel;
            }

           refreshToken.RevokedOn = DateTime.UtcNow;
            var NewRefreshToken = GenerateRefreshToken();
            user.RefreshTokens.Add(NewRefreshToken);
            await _userManager.UpdateAsync(user);

            var jwtToken=await CreateJwtToken(user);
            authmodel.IsAuthenticated=true;
            authmodel.Token=new JwtSecurityTokenHandler().WriteToken(jwtToken);
            authmodel.Email = user.Email;
            authmodel.UserName = user.UserName;
            var Roles=await _userManager.GetRolesAsync(user);
            authmodel.Roles=Roles.ToList();
            authmodel.RefreshToken = NewRefreshToken.Token;
            authmodel.RefreshTokenExpiration= NewRefreshToken.ExpiresOn;

            return authmodel;
        }
      
        private RefreshToken GenerateRefreshToken()
        {
            var randumNumber=new Byte[32];
            using var generator = new RNGCryptoServiceProvider();
            generator.GetBytes(randumNumber);
            return new RefreshToken
            {
                Token = Convert.ToBase64String(randumNumber),
                ExpiresOn= DateTime.UtcNow.AddHours(30),
                CreatedOn= DateTime.UtcNow
            };
        }
    }
}
