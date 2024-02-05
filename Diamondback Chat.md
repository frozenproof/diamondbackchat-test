# Diamondback Chat dev log

## Learning
### Shadcn/ui 
#### Component/
##### UI/
- Button: Contain all needed information for default button
    - Under the word **link** is the place for custom style definition

#### Lib
- Utils: Tell the program which version to prioritise, by using special condition for dynamic cases

```
      <Button className={cn(
        "bg-indigo-500",
        state && "bg-red-500"
      )} >     
        Click cat me
      </Button>
```

## Diary

### Day 1

#### Organizational folders

- Dùng () để tạo tên
- Tạo layout riêng trong folder này
  - 1 layout sẽ dùng chung 

