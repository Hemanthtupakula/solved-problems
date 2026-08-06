public class PolymorphismDemo {
    public static void main(String[] args) {
        Animal a = new Dog();
        a.speak();

        a = new Cat();
        a.speak();

        Calculator calc = new Calculator();
        System.out.println("int add: " + calc.add(2, 3));
        System.out.println("double add: " + calc.add(2.5, 3.5));
    }
}

class Animal {
    void speak() {
        System.out.println("Animal speaks");
    }
}

class Dog extends Animal {
    @Override
    void speak() {
        System.out.println("Dog barks");
    }
}

class Cat extends Animal {
    @Override
    void speak() {
        System.out.println("Cat meows");
    }
}

class Calculator {
    int add(int a, int b) { return a + b; }
    double add(double a, double b) { return a + b; }
}
