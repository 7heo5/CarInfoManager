using System;

namespace CarInfoManager.Models;

public class ServiceRecord
{
    public int Id {get; set;} // Primary Key
    public int CarId {get; set;} // Foreign Key to Car

    public DateTime Date {get; set;} // Date of service
    public string ServiceType {get; set;} = string.Empty; // Type of service
    public string Notes {get; set;} = string.Empty; // Any extra notes
    public decimal Cost {get; set;} // Cost of service

    public Car? Car {get; set;} // Navigation property to parent car
}
