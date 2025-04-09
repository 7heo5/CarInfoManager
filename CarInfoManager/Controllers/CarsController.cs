using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
//using CarInfoManager.API.Data;
//using CarInfoManager.API.Models;
using CarInfoManager.Data;
using CarInfoManager.Models;

namespace CarInfoManager.Controllers;

[ApiController] // Tells ASP.NET this is an API controller
[Route("api/[controller]")] // Route becomes /api/cars
public class CarsController : ControllerBase
{
    private readonly CarInfoContext _context; // EF context to access DB

    public CarsController(CarInfoContext context)
    {
        _context = context;
    }

    // GET: api/cars
    // Returns a list of all cars in the database
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Car>>> GetCars()
    {
        return await _context.Cars.ToListAsync();
    }

    // POST: api/cars
    // Adds a new car to the database
    [HttpPost]
    public async Task<ActionResult<Car>> PostCar(Car car)
    {
        _context.Cars.Add(car);
        await _context.SaveChangesAsync();

        // Returns HTTP 201 with the created car
        return CreatedAtAction(nameof(GetCars), new {id = car.Id}, car);
    }
}
