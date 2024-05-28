using BugDetectorGP.Models.user;
using System.ComponentModel.DataAnnotations;

namespace BugDetectorGP.Models.blog
{
    public class LikesAndDislikesForComments
    {
        [Key]
        public int Id { get; set; }

        public bool LikeOrDislike { get; set; }//if true this meen like else dislike 

        public DateTime PublicationDate { get; set; } = DateTime.Now;

        public int CommentId { get; set; }

        public string UserId { get; set; }

        public virtual Comment Comment { get; set; }

        public virtual UserInfo User { get; set; }
    }

}
