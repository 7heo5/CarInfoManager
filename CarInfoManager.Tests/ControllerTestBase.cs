using CarInfoManager.Data;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace CarInfoManager.Tests;

public abstract class ControllerTestBase : IDisposable
{
    private readonly SqliteConnection _connection;

    protected ControllerTestBase()
    {
        _connection = new SqliteConnection("DataSource=:memory:");
        _connection.Open();

        Context = new CarInfoContext(
            new DbContextOptionsBuilder<CarInfoContext>()
                .UseSqlite(_connection)
                .Options);

        Context.Database.EnsureCreated();
    }

    protected CarInfoContext Context { get; }

    public void Dispose()
    {
        Context.Dispose();
        _connection.Dispose();
        GC.SuppressFinalize(this);
    }
}
