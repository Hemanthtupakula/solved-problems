package TapAnswers;

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
    String colour;

    Brain(double weight, String colour) {
        this.weight = weight;
        this.colour = colour;
    }
}

class Student {

    Bike bike;
    Book book;
    Heart heart;
    Brain brain;

    Student(Bike bike, Book book) {

        this.bike = bike;
        this.book = book;
        heart = new Heart(0.3, 72);
        brain = new Brain(1.4, "Grey");
    }

    void display() {

        System.out.println("Bike Brand: " + bike.brand);
        System.out.println("Bike Mileage: " + bike.mileage);
        System.out.println("Book Name: " + book.name);
        System.out.println("Book Author: " + book.author);
        System.out.println("Heart Weight: " + heart.weight);
        System.out.println("Heart BPM: " + heart.bpm);
        System.out.println("Brain Weight: " + brain.weight);
        System.out.println("Brain Colour: " + brain.colour);
    }
}

public class AggreComposition {

    public static void main(String[] args) {

        Bike b1 = new Bike("Yamaha", 45);
        Book bk1 = new Book("Java Programming", "James Gosling");
        Student s1 = new Student(b1, bk1);
        s1.display();
    }
}