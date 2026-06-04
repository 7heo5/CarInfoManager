using CarInfoManager.Controllers;
using CarInfoManager.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarInfoManager.Tests;

public class CarsControllerTests : ControllerTestBase
{
    [Fact]
    public async Task PutCar_ExistingVehicleWithoutCustomer_CreatesCustomerAndUpdatesVehicle()
    {
        var car = new Car { Make = "Mini", Model = "Cooper", Year = 2009, VIN = "OLDVIN1234567890" };
        Context.Cars.Add(car);
        await Context.SaveChangesAsync();

        var controller = new CarsController(Context);
        var updatedCar = new Car
        {
            Id = car.Id,
            Make = "Mini",
            Model = "Cooper S",
            Year = 2010,
            VIN = "NEWVIN1234567890",
            Customer = new Customer
            {
                Name = "Sam Green",
                Phone = "07700 900111",
                Email = "sam@example.com",
                Notes = "Text before collection"
            }
        };

        var result = await controller.PutCar(car.Id, updatedCar);

        Assert.IsType<NoContentResult>(result);

        var savedCar = await Context.Cars.Include(c => c.Customer).SingleAsync(c => c.Id == car.Id);
        Assert.Equal("Cooper S", savedCar.Model);
        Assert.Equal("Sam Green", savedCar.Customer?.Name);
        Assert.Equal("07700 900111", savedCar.Customer?.Phone);
    }

    [Fact]
    public async Task PutCar_ExistingVehicleWithCustomer_UpdatesCustomerAndVehicle()
    {
        var customer = new Customer { Name = "Old Name", Phone = "1", Email = "old@example.com", Notes = "" };
        var car = new Car { Customer = customer, Make = "BMW", Model = "M2", Year = 2019, VIN = "BMWVIN1234567890" };
        Context.Cars.Add(car);
        await Context.SaveChangesAsync();

        var controller = new CarsController(Context);
        var updatedCar = new Car
        {
            Id = car.Id,
            CustomerId = customer.Id,
            Make = "BMW",
            Model = "M2 Competition",
            Year = 2020,
            VIN = "BMWVIN1234567891",
            Customer = new Customer
            {
                Id = customer.Id,
                Name = "New Name",
                Phone = "2",
                Email = "new@example.com",
                Notes = "Fleet account"
            }
        };

        var result = await controller.PutCar(car.Id, updatedCar);

        Assert.IsType<NoContentResult>(result);
        var savedCar = await Context.Cars.Include(c => c.Customer).SingleAsync(c => c.Id == car.Id);
        Assert.Equal("M2 Competition", savedCar.Model);
        Assert.Equal("New Name", savedCar.Customer?.Name);
        Assert.Single(Context.Customers);
    }

    [Fact]
    public async Task DeleteCar_RemovesVehicle()
    {
        var car = new Car { Make = "Ford", Model = "Transit", Year = 2018, VIN = "FORDVIN123456789" };
        Context.Cars.Add(car);
        await Context.SaveChangesAsync();

        var controller = new CarsController(Context);

        var result = await controller.DeleteCar(car.Id);

        Assert.IsType<NoContentResult>(result);
        Assert.Empty(Context.Cars);
    }
}
