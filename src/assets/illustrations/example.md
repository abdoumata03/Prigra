# Challenge Example: Big Sum
## Description:
> A simple paragraph describing the general idea of the challenge.

In this challenge, the goal is to get the sum of the `n` first numbers.

-   n: \[0, 10⁹\]
## Examples:
> Some examples:

-   n = 5 =\> sum = 15
-   n = 8 =\> sum = 36
## Solutions:
### The stupid solution: (Unoptimized)
> Giving the simple \'unoptimized\' solution:

The obvious (and stupid) solution is to use a `for` loop that starts at
`1`, and ends at `n`, and each time, we add the loop counter to a
variable `sum`, which will be the returned value.

``` python
def stupid(n):
    sum_value = 0
    for i in range(n+1):
        sum_value += i
    return sum_value
```

``` python
stupid(5)
```

``` python
stupid(8)
```

## The solution:
> Giving the right \'optimized\' solution:

To avoid using `for` loop, we should use the sum of a
`Arithmetic progression`.
$$\sum_{k=1}^n k = \frac{n(n+1)}{2},$$

``` python
def solution(n):
    sum_value = (n*(n+1) // 2)
    return sum_value
```

``` python
solution(5)
```

``` python
solution(8)
```

### Compact solution: (Optional)

> A clean code with less variables (if it exists):

In this solution, we made the code as small as possible with less
variables.

``` python
def compact_solution(n):
    return (n*(n+1) // 2)
```

## Testing execution time:

> In this part, we compare the stupid and the right solution in
> execution time:

-   Importing time.
-   n = 448468451

``` python
import time
n = 448468451
```

### The stupid solution:

``` python
start_time = time.time()
print(stupid(n))
print("--- %s seconds ---" % (time.time() - start_time))
```


### The correct solution:

``` python
start_time = time.time()
print(solution(n))
print("--- %s seconds ---" % (time.time() - start_time))
```


### The compact solution:

``` python
start_time = time.time()
print(compact_solution(n))
print("--- %s seconds ---" % (time.time() - start_time))
```
