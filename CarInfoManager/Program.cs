using CarInfoManager.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

//Register EF Core with SQLite
builder.Services.AddDbContext<CarInfoContext>(options => 
    options.UseSqlite("Data Source=carinfo.db"));

// Register API controllers
builder.Services.AddControllers();

// Enable Swagger for API testing/documentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Enable Swagger UI in development mode
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Seed test data at startup using a scoped service
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<CarInfoContext>();
    dbContext.Database.EnsureCreated(); // Create DB if it doesn't exist
    DbSeeder.Seed(dbContext); // Add sample data if needed
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers(); // Maps controller routes automatically

app.Run();