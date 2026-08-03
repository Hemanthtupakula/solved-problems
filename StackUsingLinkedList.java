public class StackUsingLinkedList<T> {

    private static class Node<T> {
        T data;
        Node<T> next;

        Node(T data) {
            this.data = data;
        }
    }

    private Node<T> head;

    private int size;

    public StackUsingLinkedList() {
        head = null;
        size = 0;
    }

    public void push(T data) {
        Node<T> newNode = new Node<>(data);
        newNode.next = head;
        head = newNode;
        size++;
    }

    public T pop() {
        if (isEmpty()) {
            throw new java.util.EmptyStackException();
        }
        T data = head.data;
        head = head.next;
        size--;
        return data;
    }

    // Return the top element without removing it
    public T peek() {
        if (isEmpty()) {
            throw new java.util.EmptyStackException();
        }
        return head.data;
    }

    // Check if the stack is empty
    public boolean isEmpty() {
        return head == null;
    }

    // Return the number of elements in the stack
    public int size() {
        return size;
    }

    public static void main(String[] args) {
        StackUsingLinkedList<Integer> stack = new StackUsingLinkedList<>();

        System.out.println("Pushing elements to stack...");
        stack.push(100);
        stack.push(200);
        stack.push(300);

        System.out.println("Top element is: " + stack.peek());
        System.out.println("Popped element: " + stack.pop());
        System.out.println("Stack size after pop: " + stack.size());
        System.out.println("Is stack empty? " + stack.isEmpty());
    }
}
