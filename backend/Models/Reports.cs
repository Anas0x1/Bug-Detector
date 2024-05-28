using BugDetectorGP.Models.blog;
using BugDetectorGP.Models.user;
using System.ComponentModel.DataAnnotations;

namespace BugDetectorGP.Models
{
    public class Reports
    {
        
        [Key]
        public int ReportId { get; set; }
        [Required]
        public string Type { get; set; }
        [Required]
        public string Target { get; set; }
        [Required]
        public string Result { get; set; }
        [Required]
        public DateTime PublicationDate { get; set; } = DateTime.Now.ToLocalTime();
        public string UserId { get; set; }
        public virtual UserInfo User { get; set; }
        
    }

}
