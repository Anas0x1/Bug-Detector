using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BugDetectorGP.Migrations
{
    /// <inheritdoc />
    public partial class AddLikeAndDislike : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LikesAndDislikes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LikeOrDislike = table.Column<bool>(type: "bit", nullable: false),
                    PublicationDate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()"),
                    BlogId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LikesAndDislikes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LikesAndDislikes_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LikesAndDislikes_Blogs_BlogId",
                        column: x => x.BlogId,
                        principalTable: "Blogs",
                        principalColumn: "BlogId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LikesAndDislikes_BlogId",
                table: "LikesAndDislikes",
                column: "BlogId");

            migrationBuilder.CreateIndex(
                name: "IX_LikesAndDislikes_UserId",
                table: "LikesAndDislikes",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LikesAndDislikes");
        }
    }
}
