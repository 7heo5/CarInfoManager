using System.Text.Json.Serialization;

namespace CarInfoManager.Models;

public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Notes { get; set; } = string.Empty;

    [JsonIgnore]
    public List<Car> Cars { get; set; } = new();
}
