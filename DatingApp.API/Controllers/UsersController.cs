using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IConfiguration _config;

        public UsersController(IDatingRepository repo, IConfiguration config)
        {
            _config = config;
            _repo = repo;
        }


        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _repo.GetUsers();
            return Ok(users);    
        }

        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);
            return Ok(user);    
        }
    }
}