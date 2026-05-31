# ============================================================
# RoboKid Python Lesson: Controlling a Matatu Robot!
# Starehe Boys' Centre Science Club Lab
# ============================================================

# We import the motor and sensor controls
import time
from robokid import Motor, UltrasonicSensor

print("🤖 Initializing RoboKid Matatu Robot...")
time.sleep(1)

# Connect to left and right motors
left_motor = Motor(port="A")
right_motor = Motor(port="B")

# Connect to the front eyes (ultrasonic sensor)
eyes = UltrasonicSensor(port="1")

print("🏫 School Tour starting at Nairobi Primary School...")
time.sleep(1)

# Drive forward
left_motor.set_speed(50)
right_motor.set_speed(50)
left_motor.start()
right_motor.start()
print("🚗 Matatu robot is driving forward at speed 50!")

while True:
    # Measure distance to the nearest wall or hurdle
    distance_cm = eyes.get_distance()
    print(f"📡 Sensor distance: {distance_cm} cm")
    
    if distance_cm < 20:
        # Stop and make a turn!
        print("⚠️ Obstacle detected! Braking...")
        left_motor.stop()
        right_motor.stop()
        time.sleep(0.5)
        
        print("🔄 Turning right to avoid obstacle...")
        left_motor.set_speed(40)
        left_motor.start() # spin only left motor to turn right
        time.sleep(1.5)
        left_motor.stop()
        
        print("🚗 Re-routing Matatu robot...")
        left_motor.set_speed(50)
        right_motor.set_speed(50)
        left_motor.start()
        right_motor.start()
        break
    
    time.sleep(0.2)

print("🎉 Matatu Robot successfully toured Kilimani Primary! Lesson Complete.")
