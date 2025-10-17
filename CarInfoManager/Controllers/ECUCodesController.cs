using CarInfoManager.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class ECUCodesController : ControllerBase
{
    private readonly CarInfoContext _context;

    public ECUCodesController(CarInfoContext context)
    {
        _context = context;
    }

    [HttpGet("{carId}")]
    public async Task<ActionResult<IEnumerable<ECUCodeDto>>> GetCodes(int carId)
    {
        return await _context.ECUCodes
            .Where(e => e.CarId == carId)
            .Select(e => new ECUCodeDto
            {
                Id = e.Id,
                Code = e.Code,
                Description = e.Description,
                Status = e.Status.ToString(),
                LoggedDate = e.LoggedDate
            })
            .ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<ECUCodeDto>> AddCode(ECUCodeDto dto)
    {
        var ecu = new ECUCode
        {
            CarId = dto.CarId, // Car association
            Code = dto.Code,
            Description = dto.Description,
            Status = Enum.Parse<ECUStatus>(dto.Status),
            LoggedDate = DateTime.UtcNow
        };

        _context.ECUCodes.Add(ecu);
        await _context.SaveChangesAsync();

        dto.Id = ecu.Id;
        dto.CarId = ecu.CarId;
        dto.LoggedDate = ecu.LoggedDate;

        return CreatedAtAction(nameof(GetCodes), new { carId = ecu.CarId }, dto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCode(int id, ECUCodeDto dto)
    {
        var ecu = await _context.ECUCodes.FindAsync(id);
        if (ecu == null) return NotFound();

        ecu.Code = dto.Code;
        ecu.Description = dto.Description;
        ecu.Status = Enum.Parse<ECUStatus>(dto.Status);

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCode(int id)
    {
        var ecu = await _context.ECUCodes.FindAsync(id);
        if (ecu == null) return NotFound();

        _context.ECUCodes.Remove(ecu);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
