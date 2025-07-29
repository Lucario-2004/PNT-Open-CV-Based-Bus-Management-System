# PNT-Open-CV-Based-Bus-Management-System
Supercharge your campus commute! 🚌 This is a futuristic smart bus tracking system designed for students. It offers pinpoint real-time bus locations with NavIC 🛰️, a live empty seat counter using a camera and OpenCV 📷, and timely SMS alerts so you never have to run for the bus again! 🏃💨




🚌💨 Smart Bus Tracking & Management System 🛰️📍
Welcome to the future of campus transportation! This IoT project is designed to make the daily commute for students seamless and stress-free. It combines real-time bus tracking, AI-powered seat availability checks, and automated alerts into one simple platform.

✨ Key Features
📍 Real-Time Location Tracking: Uses India's own NavIC 🛰️ satellite system for hyper-accurate, live bus location mapping. No more guessing where the bus is!

📝 Dynamic Route Management: A secure admin panel for coordinators to add, edit, or update bus routes on the fly.

🪑 Empty Seat Detection: An onboard camera with OpenCV magic 🧙‍♂️ provides a live count of available seats, so you know if you'll get a spot.

📱 Automated SMS Alerts: Get notified automatically when your bus is near! Receive alerts at 3 stops away, 1 stop away, and when your stop is next.

🌐 Open Access for Users: Students can instantly access bus info without needing to log in. Just open the site and go!

🛠️ Technology Stack
🤖 Hardware: ESP32-CAM, NavIC Module, GSM Module (SIM800L)

🐍 Backend & AI: Python (with Flask/Django), OpenCV

🎨 Frontend: HTML, CSS, JavaScript

📡 Communication Protocols: HTTP, MQTT (for lightweight and fast data transfer)

⚙️ System Architecture & Workflow
Here’s how the magic happens from the bus to your phone!

🚌 On-Bus Data Capture: The ESP32 is the brain of the operation.

It fetches precise location data (latitude/longitude) from the NavIC module.

It snaps a picture with the camera 📸.

📡 Data Transmission: The GSM module sends this packet of information (location + image) to our server in the cloud ☁️.

☁️ Server-Side Processing:

A Python backend catches the data.

The location is saved and updated on a live map.

The image is passed to an OpenCV script that counts the empty seats. 🪑

The server constantly checks the bus's location. When it gets close to a student's stop, it fires off an SMS alert! 📲

🖥️ User Interface:

A clean, simple webpage shows all the live info.

Students see bus locations, ETAs, and seat counts.

Admins log in to a special portal to manage all the bus routes.

🔌 Hardware & Pin Diagram
This setup is centered around the versatile ESP32-CAM.

Component	Connection to ESP32-CAM	Purpose
🛰️ NavIC Module	GPIO 1 (TX), GPIO 3 (RX)	Gets GPS data from space!
📡 GSM Module	GPIO 12 (TX), GPIO 13 (RX)	Talks to the internet via cell network
📷 Camera	Integrated CSI Port	Captures images for seat analysis
⚡ Power	5V, GND	Powers everything up!
Friendly Reminder! 💡 Use a logic level shifter if your modules use a different voltage than the ESP32's 3.3V to prevent any hardware hiccups.


+-----------------------+
                 |       ESP32-CAM       |
                 |                       |
(NavIC TX)-------| GPIO 1  (U0TXD)       |
(NavIC RX)-------| GPIO 3  (U0RXD)       |
                 |                       |
(GSM TX)---------| GPIO 12 (HS2_DATA2)   |
(GSM RX)---------| GPIO 13 (HS2_DATA3)   |
                 |                       |
                 | 5V               GND  |
                 +--|----------------|--+
                    |                |
                +---+ VCC        +---+- GND
                | NavIC Module |   | GSM Module
                +--------------+   +------------+

🚀 Core Functionalities Explained
🛰️ Real-Time Tracking & Route Navigation (PNT)
We use NavIC (Navigation with Indian Constellation) for top-tier Positioning, Navigation, and Timing (PNT). The ESP32 reads location data and sends it to the server, which then visualizes the bus's movement on a map for students. The server also calculates the ETA ⏱️ by comparing the bus's position to the student's stop along the defined route.

📷 OpenCV-Based Empty Seat Detection
Know your chances of getting a seat before the bus even arrives!

Trigger: A new photo is taken after the bus travels ~50 meters from a stop, ensuring the count is fresh after people get on or off.

Processing: The image is sent to the server where an OpenCV script works its magic. It uses a smart algorithm (like a YOLO object detection model) to spot 'persons' 🧑‍🤝‍🧑. The simple math: Total Seats - Detected Persons = Empty Seats.

Update: The empty seat count is instantly updated on the website.

📱 Automated SMS Alert System
Never miss your bus again with our trusty alert system!

Server Logic: The backend is the vigilant watchtower. It knows all the bus routes and all the stops by heart.

Trigger Condition: When a bus enters the 3-stop radius of your boarding point, the alert sequence begins!

Multi-Stage Alerts:

First Alert (3 stops away): "Hey! 👋 Bus 4A is 3 stops away. See you in ~8 mins!"

Second Alert (1 stop away): "Getting close! 👀 Bus 4A is just one stop away. Head to your pickup point!"

Final Alert (Next stop): "Here it comes! 🚌 Your stop is next. Be ready!"

Coordinator Alert: The moment the bus enters the campus, a confirmation SMS is sent to the transport coordinator. Mission complete! ✅

📈 Analytics and Future Scope
This project is not just a tracker; it's a data goldmine! 💰

📊 Route Optimization: Analyze historical data to find faster, more efficient routes and avoid traffic jams.

📈 Demand Analysis: See which stops are busiest and at what times to better allocate resources.

🛠️ Predictive Maintenance: Log engine hours and distance to predict when a bus needs a check-up, preventing breakdowns.
