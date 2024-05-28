using BugDetectorGP.Models.user;
using System.ComponentModel.DataAnnotations;

namespace BugDetectorGP.Models.blog
{
    public class LikesAndDislikes
    {
        [Key]
        public int Id { get; set; }

        public bool LikeOrDislike { get; set; }//if true this meen like else dislike 

        public DateTime PublicationDate { get; set; } = DateTime.Now;

        public int BlogId { get; set; }

        public string UserId { get; set; }

        public virtual Blogs Blog { get; set; }

        public virtual UserInfo User { get; set; }
    }

}
