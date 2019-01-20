# Troubleshooting

## Installation

Clicker Desktop application requires Java 8.

We supply two types of binaries:
- Clicker Desktop with Oracle JRE bundled
- Clicker Desktop without Java (Java 8 should be installed on your computer)

We also supply plain Jar file. To run it, type in the terminal:

```
java -jar Clicker.Desktop.App.All.platforms.jar
```

## Discovery

### Application does not find my computer

There are several reasons why the application cannot find your computer automatically.

1. The Clicker Desktop Application is not running on your computer.
 - Run the app on your computer and wait a couple of seconds.
2. Your computer and your phone are located in different WiFi networks.
 - Make sure your computer and your phone are connected to the same WiFi network.
 - **NOTE**: many Android phones come with built-in Hotspot available which can be used to connect your computer with your phone in places where there are no WiFi networks.
3. Your computer has firewall active, which blocks incoming connections.
 - Please check your firewall settings and make sure the port *17381* is open and the *Clicker* application is not blocked.
4. Your WiFi router is configured to block port scan in the network.
 - In the mobile app, use **Manual Connect** to establish connection to your computer.
