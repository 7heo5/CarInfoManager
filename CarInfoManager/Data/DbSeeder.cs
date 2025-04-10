using System;
using CarInfoManager.Models;

namespace CarInfoManager.Data;

// Seeds the database with test data if empty
public static class DbSeeder
{
    public static void Seed(CarInfoContext context)
    {
        if (context.Cars.Any()) return; // If data already exists, skip

        var cars = new List<Car>()
        {
            new Car {Make = "Mini", Model = "Cooper", Year = 2009, VIN = "1NXBR32E85Z123456"},
            new Car {Make = "BMW", Model = "M2", Year = 2019, VIN = "3FADP4BJ0FM123456"}
        };

        var serviceRecords = new List<ServiceRecord>
        {
            new ServiceRecord {Car = cars[0], Date = DateTime.Today.AddMonths(-6), ServiceType = "Oil Change", Cost = 60.00m, Notes = "Changed oil and filter"},
            new ServiceRecord {Car = cars[1], Date = DateTime.Today.AddMonths(-3), ServiceType = "Brake Pads", Cost = 120.00m, Notes = "Replaced front brake pads"}
        };

        context.Cars.AddRange(cars);
        context.ServiceRecords.AddRange(serviceRecords);

        context.SaveChanges();
    }
}
