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

# Notes

## Middleware.ts

Only thing that worked, this is way to unneccesarily difficult, the entire point of why it wasnt showing up was because i was creating a mutilingual site whose root is at [lang] so it never really ever finds the favicon at the root cuz its always redirected. and I followed that example directly from the nextjs website

also I just realized how stupid I was and anyone who is going through my same issue do the above or modify the config matchter inside the middleware to exclude the favicon.ico which nextjs automatically detects
export const config = { matcher: [ // Skip all internal paths (_next) "/((?!api|_next/static|_next/image|favicon.ico).*)", // Optional: only run on root (/) URL // '/' ], };

What I got 

```
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next|_next/image|favicon.ico).*)", "/", "/(api|trpc)(.*)"],
};
```


## Schema prisma
//do not do this in production 
//in production , we only create a new instance, assuming we are hosting 
//in development , to avoid creating too many instances , we use the same instance of prisma , which avoid host reload  
//global will avoid host reload

```
  export const db = globalThis.prisma  || new PrismaClient();

  if(process.env.NODE_ENV !=="production") 
      globalThis.prisma = db
```
