using CarInfoManager.Models;

public enum ECUStatus { Pending, Resolved }

public class ECUCode
{
    public int Id { get; set; }
    
    public int CarId { get; set; }
    public Car Car { get; set; } = null!;

    public string Code { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

    public ECUStatus Status { get; set; } = ECUStatus.Pending;
    public DateTime LoggedDate { get; set; } = DateTime.UtcNow;
}