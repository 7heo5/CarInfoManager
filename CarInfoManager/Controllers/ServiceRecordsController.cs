using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarInfoManager.Data;
using CarInfoManager.Models;

namespace CarInfoManager.Controllers;

[ApiController] // Marks this as an API controller
[Route("api/[controller]")] // Route becomes /api/servicerecords
public class ServiceRecordsController : ControllerBase
{
    private readonly CarInfoContext _context;

    public ServiceRecordsController(CarInfoContext context)
    {
        _context = context;
    }

    // GET: api/servicerecords
    // Returns all service records with linked car info
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ServiceRecord>>> GetServiceRecords()
    {
        return await _context.ServiceRecords
            .Include(sr => sr.Car) // Eager load related car data
            .ToListAsync();
    }

    // GET: api/servicerecords/car/5
    // Returns all service records for a specific car by its ID
    [HttpGet("car/{carId}")]
    public async Task<ActionResult<IEnumerable<ServiceRecord>>> GetServiceRecordsForCar(int carId)
    {
        var records = await _context.ServiceRecords
            .Where(sr => sr.CarId == carId)
            .OrderByDescending(sr => sr.Date)
            .ToListAsync();

        return records;
    }

    // POST: api/servicerecords
    // Adds a new service record
    [HttpPost]
    public async Task<ActionResult<ServiceRecord>> PostServiceRecord(ServiceRecord record)
    {
        var carExists = await _context.Cars.AnyAsync(c => c.Id == record.CarId);
        if (!carExists)
        {
            return NotFound($"No car found with ID {record.CarId}");
        }

        _context.ServiceRecords.Add(record);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetServiceRecords), new { id = record.Id }, record);
    }
}
