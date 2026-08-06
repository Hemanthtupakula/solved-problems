public class First {
    // Method 1: Prints a greeting
    public void greet(String name) {
        System.out.println("Hello, " + name + "!");
    }

    // Method 2: Adds two numbers and returns the result
    public int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        // Create one object of the First class
        First myObject = new First();

        // Call the first method
        myObject.greet("User");

        // Call the second method
        int sum = myObject.add(10, 20);
        System.out.println("The sum of 10 and 20 is: " + sum);
    }
}
