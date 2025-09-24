using System;
using Microsoft.EntityFrameworkCore;
//using CarInfoManager.API.Models;
using CarInfoManager.Models;

namespace CarInfoManager.Data;

// EF Core DbContext - this defines our database tables
public class CarInfoContext : DbContext
{
    public CarInfoContext(DbContextOptions<CarInfoContext> options) : base(options) { }

    public DbSet<Car> Cars => Set<Car>(); // Represents the Cars table
    public DbSet<ServiceRecord> ServiceRecords => Set<ServiceRecord>(); // Represents the ServiceRecords table
    public DbSet<ECUCode> ECUCodes { get; set; }
}
