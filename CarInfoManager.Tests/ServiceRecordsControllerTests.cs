using CarInfoManager.Controllers;
using CarInfoManager.Models;
using Microsoft.AspNetCore.Mvc;

namespace CarInfoManager.Tests;

public class ServiceRecordsControllerTests : ControllerTestBase
{
    [Fact]
    public async Task PostServiceRecord_RejectsUnknownVehicle()
    {
        var controller = new ServiceRecordsController(Context);
        var record = new ServiceRecord
        {
            CarId = 999,
            Date = new DateTime(2026, 1, 1),
            ServiceType = "Oil Change",
            Notes = "",
            Cost = 100
        };

        var result = await controller.PostServiceRecord(record);

        Assert.IsType<NotFoundObjectResult>(result.Result);
    }

    [Fact]
    public async Task PutServiceRecord_UpdatesExistingRecord()
    {
        var car = new Car { Make = "VW", Model = "Caddy", Year = 2017, VIN = "VWVIN12345678901" };
        var record = new ServiceRecord
        {
            Car = car,
            Date = new DateTime(2026, 1, 1),
            ServiceType = "Inspection",
            Notes = "Initial notes",
            Cost = 50
        };
        Context.ServiceRecords.Add(record);
        await Context.SaveChangesAsync();

        var controller = new ServiceRecordsController(Context);
        var updatedRecord = new ServiceRecord
        {
            Id = record.Id,
            CarId = car.Id,
            Date = new DateTime(2026, 2, 1),
            ServiceType = "Brake Service",
            Notes = "Front pads replaced",
            Cost = 180
        };

        var result = await controller.PutServiceRecord(record.Id, updatedRecord);

        Assert.IsType<NoContentResult>(result);
        var savedRecord = Context.ServiceRecords.Single();
        Assert.Equal("Brake Service", savedRecord.ServiceType);
        Assert.Equal(180, savedRecord.Cost);
    }

    [Fact]
    public async Task DeleteServiceRecord_RemovesRecord()
    {
        var car = new Car { Make = "Vauxhall", Model = "Vivaro", Year = 2016, VIN = "VIVAROVIN1234567" };
        var record = new ServiceRecord { Car = car, Date = DateTime.Today, ServiceType = "MOT", Notes = "", Cost = 54.85m };
        Context.ServiceRecords.Add(record);
        await Context.SaveChangesAsync();

        var controller = new ServiceRecordsController(Context);

        var result = await controller.DeleteServiceRecord(record.Id);

        Assert.IsType<NoContentResult>(result);
        Assert.Empty(Context.ServiceRecords);
    }
}
