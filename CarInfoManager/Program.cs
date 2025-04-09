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

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers(); // Maps controller routes automatically

app.Run();