class Calculator {
    int add(int a, int b) {
        return a + b;
    }
}

public class TwoClassesDemo {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        int sum = calc.add(5, 7);
        System.out.println("The sum of 5 and 7 is: " + sum);
    }
}
