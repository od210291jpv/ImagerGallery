using FpzParser.Interfaces;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using MyApp.Infra.Database;
using MyApp.Services;
using MyApp.Services.Interfaces;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.SetIsOriginAllowed(origin => true) // Динамічно дозволяє будь-який Origin (замінює AllowAnyOrigin)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();                // Дозволяє передачу кукі/токенів для SignalR
    });
});

// Add services to the container.
builder.Services.AddHttpClient();
builder.Services.AddRazorPages();
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers().AddNewtonsoftJson();
builder.Services.AddScoped<IAuthService, SimpleAuthService>();
builder.Services.AddScoped<ITokenService, SimpleTokenService>();
builder.Services.AddScoped<IContentParser, FpzParser.FpzParser>();


string? connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ApplicationContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

WebApplication app = builder.Build();



// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

app.UseRouting(); // 1. Спочатку визначаємо маршрут

app.UseCors("AllowAll");

app.UseStaticFiles().UseRouting().UseAuthorization().UseAuthentication();
app.UseCors("MyAllowSpecificOrigins");
app.UseSwagger();
app.UseSwaggerUI();
app.MapRazorPages();
app.MapControllers();
app.MapDefaultControllerRoute();
app.Run();
