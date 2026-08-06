import java.util.ArrayList;

public class StackUsingArrayList<T> {
    private ArrayList<T> list;

    public StackUsingArrayList() {
        list = new ArrayList<>();
    }

    public void push(T data) {
        list.add(data);
    }

    public T pop() {
        if (isEmpty()) {
            throw new java.util.EmptyStackException();
        }
        return list.remove(list.size() - 1);
    }

    public T peek() {
        if (isEmpty()) {
            throw new java.util.EmptyStackException();
        }
        return list.get(list.size() - 1);
    }

    public boolean isEmpty() {
        return list.isEmpty();
    }

    public int size() {
        return list.size();
    }

    public static void main(String[] args) {
        StackUsingArrayList<Integer> stack = new StackUsingArrayList<>();

        System.out.println("Pushing elements to stack...");
        stack.push(10);
        stack.push(20);
        stack.push(30);

        System.out.println("Top element is: " + stack.peek());
        System.out.println("Popped element: " + stack.pop());
        System.out.println("Stack size after pop: " + stack.size());
        System.out.println("Is stack empty? " + stack.isEmpty());
    }
}
