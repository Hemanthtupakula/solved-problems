// --- COMPOSITION CLASSES ---
class Heart {
    double weight;
    int bpm;

    Heart(double weight, int bpm) {
        this.weight = weight;
        this.bpm = bpm;
    }
}

class Brain {
    double weight;
    String color;

    Brain(double weight, String color) {
        this.weight = weight;
        this.color = color;
    }
}

// --- AGGREGATION CLASSES ---
class Bike {
    String brand;
    int mileage;

    Bike(String brand, int mileage) {
        this.brand = brand;
        this.mileage = mileage;
    }
}

class Book {
    String name;
    String author;

    Book(String name, String author) {
        this.name = name;
        this.author = author;
    }
}

// --- MAIN CLASS ---
class Student {
    // Composition: Created inside the Student constructor
    private Heart heart;
    private Brain brain;

    // Aggregation: Passed from outside (can exist without Student)
    private Bike bike;
    private Book book;

    Student(Bike bike, Book book) {
        // Composition: The Student "owns" the lifecycle of these objects
        this.heart = new Heart(0.3, 72);
        this.brain = new Brain(1.4, "Grey");

        // Aggregation: The Student just uses these objects
        this.bike = bike;
        this.book = book;
    }

    void displayDetails() {
        System.out.println("Student has a " + bike.brand + " bike.");
        System.out.println("Student is reading " + book.name + " by " + book.author);
        System.out.println("Student's heart rate: " + heart.bpm + " BPM");
    }
}

public class Main {
    public static void main(String[] args) {
        // Objects for Aggregation
        Bike myBike = new Bike("Yamaha", 45);
        Book myBook = new Book("Java Programming", "John Smith");

        // Create Student
        Student s1 = new Student(myBike, myBook);
        s1.displayDetails();
    }
}