using System.Text.Json.Serialization;

namespace BugDetectorGP.Models.user
{
    public class AuthModel
    {
        public string message { get; set; }

        public bool IsAuthenticated { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public List<string> Roles { get; set; }

        public string Token { get; set; }

        public DateTime? ExpireOn { get; set; }
        [JsonIgnore]
        public string? RefreshToken { get; set; }

        public DateTime RefreshTokenExpiration { get; set; }
    }
}
