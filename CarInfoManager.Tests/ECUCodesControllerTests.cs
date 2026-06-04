using CarInfoManager.Models;
using Microsoft.AspNetCore.Mvc;

namespace CarInfoManager.Tests;

public class ECUCodesControllerTests : ControllerTestBase
{
    [Fact]
    public async Task AddCode_CreatesPendingCodeForVehicle()
    {
        var car = new Car { Make = "Nissan", Model = "NV200", Year = 2015, VIN = "NISSANVIN123456" };
        Context.Cars.Add(car);
        await Context.SaveChangesAsync();

        var controller = new ECUCodesController(Context);
        var dto = new ECUCodeDto
        {
            CarId = car.Id,
            Code = "P0301",
            Description = "Cylinder 1 misfire",
            Status = "Pending"
        };

        var result = await controller.AddCode(dto);

        var created = Assert.IsType<CreatedAtActionResult>(result.Result);
        var saved = Assert.IsType<ECUCodeDto>(created.Value);
        Assert.True(saved.Id > 0);
        Assert.Equal("P0301", Context.ECUCodes.Single().Code);
    }

    [Fact]
    public async Task UpdateCode_UpdatesStatusAndDescription()
    {
        var car = new Car { Make = "Renault", Model = "Kangoo", Year = 2014, VIN = "KANGOOVIN123456" };
        var code = new ECUCode
        {
            Car = car,
            Code = "P0420",
            Description = "Catalyst efficiency below threshold",
            Status = ECUStatus.Pending
        };
        Context.ECUCodes.Add(code);
        await Context.SaveChangesAsync();

        var controller = new ECUCodesController(Context);
        var dto = new ECUCodeDto
        {
            Code = "P0420",
            Description = "Sensor replaced",
            Status = "Resolved"
        };

        var result = await controller.UpdateCode(code.Id, dto);

        Assert.IsType<NoContentResult>(result);
        var savedCode = Context.ECUCodes.Single();
        Assert.Equal("Sensor replaced", savedCode.Description);
        Assert.Equal(ECUStatus.Resolved, savedCode.Status);
    }

    [Fact]
    public async Task DeleteCode_RemovesCode()
    {
        var car = new Car { Make = "Peugeot", Model = "Partner", Year = 2013, VIN = "PARTNERVIN12345" };
        var code = new ECUCode { Car = car, Code = "P0101", Description = "MAF range", Status = ECUStatus.Pending };
        Context.ECUCodes.Add(code);
        await Context.SaveChangesAsync();

        var controller = new ECUCodesController(Context);

        var result = await controller.DeleteCode(code.Id);

        Assert.IsType<NoContentResult>(result);
        Assert.Empty(Context.ECUCodes);
    }
}
