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

# Day 2
- Created modals folder and fixed the db connection .
- What is a modal 
```
A modal (also called a modal window or lightbox) is a web page element that displays in front of and deactivates all other page content. To return to the main content, the user must engage with the modal by completing an action or by closing it
```

## Zod

- Default values và formSchema phải cùng tên biến 


```
   const formSchema = z.object({
        name: z.string().min(1,{
            message: "Server name is required."
        }),
        imageUrl: z.string().min(1, {
            message: "Server image is required."
        })
    })
    export const InitialModal = () => {
        const form = useForm({
            resolver: zodResolver(formSchema),
            defaultValues:{
                name: "",
                imageUrl: "",
            }
        }); 


    const onSubmit = async (values: z.infer<typeof formSchema>) =>{
        console.log(values);
    }
```


```
    <Form  {...form}>
        <form onSubmit = {form.handleSubmit(onSubmit)} 
        className="space-y-8">
            <div className="space-y-8 px-6">

            </div>
        </form>
    </Form>
```

## Fix hydration error
```
    const [isMounted , setIsMounted] = useState(false);
    
    useEffect(() => {
        setIsMounted(true);
    }, []);
    
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name: "",
            imageUrl: "",
        }
    }); 
```

```
if(!isMounted){
    return null;
}
```