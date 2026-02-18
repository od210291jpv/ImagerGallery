using FpzParser.Interfaces;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using MyApp.Infra.Database;
using MyApp.Services;
using MyApp.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("MyAllowSpecificOrigins",
        policy =>
        {
            policy.AllowAnyOrigin() // The URL of your JS app
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddControllers();
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

app.UseStaticFiles().UseRouting().UseAuthorization();
app.UseCors("MyAllowSpecificOrigins");
app.UseSwagger();
app.UseSwaggerUI();
app.MapRazorPages();
app.MapControllers();
app.MapDefaultControllerRoute();
app.Run();
