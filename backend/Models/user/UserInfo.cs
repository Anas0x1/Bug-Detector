using BugDetectorGP.Models.blog;
using Microsoft.AspNetCore.Identity;
using System.Reflection.Metadata;

namespace BugDetectorGP.Models.user
{
    public class UserInfo : IdentityUser
    {
        public List<RefreshToken>? RefreshTokens { get; set; }
        public bool IsSubscripe { get; set; }
        //public DateTime StartSubpscrtion ;
        //public DateTime EndSubscrption =>IsSubscripe? StartSubpscrtion.AddYears(1):DateTime.UtcNow;

        public virtual ICollection<Blogs> Blogs { get; set; } = new List<Blogs>();
        public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
        public virtual ICollection<LikesAndDislikes> LikesAndDislikes { get; set; } = new List<LikesAndDislikes>();

    }
}
