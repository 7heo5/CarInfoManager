using CarInfoManager.Controllers;
using CarInfoManager.Models;
using Microsoft.AspNetCore.Mvc;

namespace CarInfoManager.Tests;

public class CustomersControllerTests : ControllerTestBase
{
    [Fact]
    public async Task PostCustomer_CreatesCustomer()
    {
        var controller = new CustomersController(Context);
        var customer = new Customer
        {
            Name = "Taylor Motors",
            Phone = "07700 900222",
            Email = "hello@taylormotors.example",
            Notes = "Trade customer"
        };

        var result = await controller.PostCustomer(customer);

        var created = Assert.IsType<CreatedAtActionResult>(result.Result);
        var saved = Assert.IsType<Customer>(created.Value);
        Assert.True(saved.Id > 0);
        Assert.Single(Context.Customers);
    }

    [Fact]
    public async Task PutCustomer_UpdatesCustomer()
    {
        var customer = new Customer { Name = "Old", Phone = "", Email = "", Notes = "" };
        Context.Customers.Add(customer);
        await Context.SaveChangesAsync();

        var controller = new CustomersController(Context);
        var updatedCustomer = new Customer
        {
            Id = customer.Id,
            Name = "Updated",
            Phone = "07700 900333",
            Email = "updated@example.com",
            Notes = "Prefers email"
        };

        var result = await controller.PutCustomer(customer.Id, updatedCustomer);

        Assert.IsType<NoContentResult>(result);
        Assert.Equal("Updated", Context.Customers.Single().Name);
    }

    [Fact]
    public async Task DeleteCustomer_RemovesCustomer()
    {
        var customer = new Customer { Name = "Delete Me", Phone = "", Email = "", Notes = "" };
        Context.Customers.Add(customer);
        await Context.SaveChangesAsync();

        var controller = new CustomersController(Context);

        var result = await controller.DeleteCustomer(customer.Id);

        Assert.IsType<NoContentResult>(result);
        Assert.Empty(Context.Customers);
    }
}
