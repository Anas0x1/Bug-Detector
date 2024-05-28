using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BugDetectorGP.Migrations
{
    /// <inheritdoc />
    public partial class addLikesForComments : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LikesAndDislikesForComments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LikeOrDislike = table.Column<bool>(type: "bit", nullable: false),
                    PublicationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CommentId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LikesAndDislikesForComments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LikesAndDislikesForComments_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LikesAndDislikesForComments_Comment_CommentId",
                        column: x => x.CommentId,
                        principalTable: "Comment",
                        principalColumn: "CommentId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LikesAndDislikesForComments_CommentId",
                table: "LikesAndDislikesForComments",
                column: "CommentId");

            migrationBuilder.CreateIndex(
                name: "IX_LikesAndDislikesForComments_UserId",
                table: "LikesAndDislikesForComments",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LikesAndDislikesForComments");
        }
    }
}
