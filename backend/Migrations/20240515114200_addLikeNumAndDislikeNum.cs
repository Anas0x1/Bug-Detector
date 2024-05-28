using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BugDetectorGP.Migrations
{
    /// <inheritdoc />
    public partial class addLikeNumAndDislikeNum : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DislikeNumber",
                table: "Comment",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "LikeNumber",
                table: "Comment",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DislikeNumber",
                table: "Comment");

            migrationBuilder.DropColumn(
                name: "LikeNumber",
                table: "Comment");
        }
    }
}
