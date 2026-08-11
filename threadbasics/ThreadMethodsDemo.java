package threadbasics;

import java.util.Arrays;

/**
 * A comprehensive demonstration of thread methods in Java.
 * Covers classic thread methods and Java 21+ Virtual Thread methods.
 */
public class ThreadMethodsDemo {

    // A shared lock object for demonstrating synchronization and holdsLock
    private static final Object LOCK = new Object();

    // A simple Runnable implementation
    static class Task implements Runnable {
        @Override
        public void run() {
            Thread current = Thread.currentThread();
            System.out.printf("[%s] Task started. ID: %d, Priority: %d, Daemon: %b, Virtual: %b%n",
                    current.getName(), current.threadId(), current.getPriority(), current.isDaemon(), current.isVirtual());

            // 1. Demonstrate holdsLock(Object)
            System.out.printf("[%s] Holds LOCK before synchronizing? %b%n", current.getName(), Thread.holdsLock(LOCK));
            synchronized (LOCK) {
                System.out.printf("[%s] Holds LOCK inside synchronized block? %b%n", current.getName(), Thread.holdsLock(LOCK));
            }

            // 2. Demonstrate sleep(long millis)
            try {
                System.out.printf("[%s] Going to sleep for 500ms...%n", current.getName());
                Thread.sleep(500);
                System.out.printf("[%s] Woke up from sleep.%n", current.getName());
            } catch (InterruptedException e) {
                System.out.printf("[%s] Sleep interrupted! Interrupted status: %b%n", current.getName(), current.isInterrupted());
                return;
            }

            // 3. Demonstrate yield()
            System.out.printf("[%s] Yielding execution control...%n", current.getName());
            Thread.yield();

            // 4. Demonstrate interrupt & isInterrupted()
            System.out.printf("[%s] Checking interruption status before looping... Interrupted: %b%n", current.getName(), Thread.interrupted());
            
            int counter = 0;
            while (!Thread.currentThread().isInterrupted()) {
                counter++;
                if (counter > 100000) {
                    // Prevent infinite loop if not interrupted, but let's break anyway
                    break;
                }
            }
            
            System.out.printf("[%s] Task finished.%n", current.getName());
        }
    }

    public static void main(String[] args) {
        System.out.println("=== 1. MAIN THREAD DETAILS (Thread.currentThread()) ===");
        // Get reference to the executing thread
        Thread mainThread = Thread.currentThread();
        System.out.println("Thread Name: " + mainThread.getName());
        System.out.println("Thread ID (threadId()): " + mainThread.threadId());
        System.out.println("Thread Priority (getPriority()): " + mainThread.getPriority());
        System.out.println("Thread State (getState()): " + mainThread.getState());
        System.out.println("Is Alive (isAlive()): " + mainThread.isAlive());
        System.out.println("Is Daemon (isDaemon()): " + mainThread.isDaemon());
        System.out.println("Is Virtual (isVirtual()): " + mainThread.isVirtual());

        System.out.println("\n=== 2. MODIFYING THREAD PROPERTIES ===");
        // Modify name and priority of main thread
        mainThread.setName("Main-Demo-Thread");
        mainThread.setPriority(Thread.MAX_PRIORITY); // Priority 10
        System.out.println("Updated Thread Name: " + mainThread.getName());
        System.out.println("Updated Thread Priority: " + mainThread.getPriority());

        System.out.println("\n=== 3. CREATING AND RUNNING PLATFORM THREADS ===");
        // Using classic Thread constructor (Platform Thread)
        Thread t1 = new Thread(new Task(), "Platform-Thread-1");
        System.out.println("Thread t1 state before start(): " + t1.getState());
        System.out.println("Is t1 alive before start()? " + t1.isAlive());

        // Start t1
        t1.start();
        System.out.println("Thread t1 state after start(): " + t1.getState());
        System.out.println("Is t1 alive after start()? " + t1.isAlive());

        // Using Thread.Builder to create a Platform Thread
        Thread t2 = Thread.ofPlatform()
                .name("Platform-Thread-2")
                .daemon(true) // Set as daemon thread
                .priority(Thread.NORM_PRIORITY - 1) // Priority 4
                .unstarted(new Task());

        System.out.println("Thread t2 (Builder) is Daemon: " + t2.isDaemon());
        System.out.println("Thread t2 (Builder) Priority: " + t2.getPriority());
        t2.start();

        System.out.println("\n=== 4. CREATING AND RUNNING VIRTUAL THREADS (Java 21+) ===");
        // Option A: Start virtual thread directly
        Thread virtualThread1 = Thread.startVirtualThread(() -> {
            Thread current = Thread.currentThread();
            System.out.printf("[%s] Virtual Thread executing. ID: %d, Virtual: %b%n",
                    current.getName(), current.threadId(), current.isVirtual());
        });

        // Option B: Using Thread.Builder for Virtual Threads
        Thread virtualThread2 = Thread.ofVirtual()
                .name("Virtual-Thread-Custom-Name")
                .unstarted(new Task());
        
        System.out.println("Is virtualThread2 Virtual? " + virtualThread2.isVirtual());
        virtualThread2.start();

        System.out.println("\n=== 5. DEMONSTRATING THREAD INTERRUPTION ===");
        // Let threads run for 100 milliseconds, then interrupt t1
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("Interrupting Platform-Thread-1...");
        t1.interrupt(); // Sends interrupt signal to t1

        System.out.println("\n=== 6. DEMONSTRATING JOIN (Waiting for thread completion) ===");
        try {
            System.out.println("Waiting for t1 (Platform-Thread-1) to terminate using join()...");
            t1.join(); // Blocks main thread until t1 is finished
            System.out.println("t1 Joined. Current t1 State: " + t1.getState());
            System.out.println("Is t1 alive? " + t1.isAlive());

            System.out.println("Waiting for virtualThread2 to terminate using join()...");
            virtualThread2.join();
            System.out.println("virtualThread2 Joined. State: " + virtualThread2.getState());
        } catch (InterruptedException e) {
            System.out.println("Main thread interrupted while waiting to join.");
        }

        System.out.println("\n=== 7. THREAD GROUP & ACTIVE COUNT ===");
        // Demonstrate Thread.activeCount() and Thread.enumerate()
        int activeCount = Thread.activeCount();
        System.out.println("Estimated active threads in current thread group: " + activeCount);
        
        Thread[] threadArray = new Thread[activeCount + 5];
        int actualCount = Thread.enumerate(threadArray);
        System.out.println("Enumerated threads in current thread group:");
        for (int i = 0; i < actualCount; i++) {
            Thread t = threadArray[i];
            System.out.printf(" - Thread ID: %d, Name: %s, State: %s, Daemon: %b%n",
                    t.threadId(), t.getName(), t.getState(), t.isDaemon());
        }

        System.out.println("\n=== 8. DUMPING STACK OF CURRENT THREAD ===");
        // Demonstrate static method Thread.dumpStack()
        Thread.dumpStack();
    }
}
