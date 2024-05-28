using BugDetectorGP.Models.blog;
using BugDetectorGP.Models.user;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;

namespace BugDetectorGP.Models
{
    public class ApplicationDbContext : IdentityDbContext<UserInfo>
    {
        public ApplicationDbContext()
        {
        }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Blogs> Blogs { get; set; }
        public DbSet<Comment> Comment { get; set; }
        public DbSet<LikesAndDislikes> LikesAndDislikes { get; set; }
        public DbSet<LikesAndDislikesForComments> LikesAndDislikesForComments { get; set; }
        public DbSet<Reports> Reports { get; set; }

    }
}
