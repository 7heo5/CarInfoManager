using System;

namespace CarInfoManager.Models;

public class Car
{
    public int Id {get; set;} // Primary Key
    public string Make {get; set;} = string.Empty; // Car Brand
    public string Model {get; set;} = string.Empty; // Car Model
    public int Year {get; set;} // Manufacture Year
    public string VIN {get; set;} = string.Empty; // Vehicle Identification Number

    public List<ServiceRecord> ServiceRecords {get; set;} = new(); // One-to-many relationship
}
