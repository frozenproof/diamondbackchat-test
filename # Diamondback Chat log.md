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
- Created Prompts folder and fixed the db connection .
- What is a Prompt 
```
A Prompt (also called a Prompt window or lightbox) is a web page element that displays in front of and deactivates all other page content. To return to the main content, the user must engage with the Prompt by completing an action or by closing it
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
    export const InitialPrompt = () => {
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

- Lý do: vì Prompt có thể chỉ hiển thị trên một client , chúng ta không muốn Prompt hiển thị trên server khi không dùng . Mặc dù việc render của tất cả component vẫn là server , việc hiển thị có thể gây ra hydration error khi hiển thị không khớp .


# Day 3
## Children

- Để sử dụng react node như một đối tượng parent , cần tạo đầu vào là children
- Sua database
```
    npx prisma generate
    npx prisma db push
```

- Reset database de phong bug
```
    npx prisma migrate reset
```

# Day 4
## Invite

- Cuc ki kho 

- Server co invite code default , khi tao ra server. Khi nguoi dung bat invite len , chac chan nguoi dung nay da co inviteCode trong ServerInvite .
    - Can query duoc invite code tu trong server invite

    
- Client khong the su dung cau lenh sql
- Client gui thong tin server di , 

API nhan id server , id nguoi dung -> tim ra server , client invite 


Viec api tim kiem server can tim la rat don gian , nhung generate link moi thi khac

- Cần sử dụng thêm 2 api :
    - api tìm kiếm server trong bảng invite
    - api tạo invite mới
- Thay đổi api invite mới thành accept invite theo cơ chế:
    - người dùng tìm invite code từ bảng invite server
    - api tìm kiếm server có invite code 
    - bổ sung người dùng cho server
    - bảng invite server tự tạo record cho mỗi người dùng join server
    
# Day 5
## User 
User cần hoàn thiện việc sử dụng

Nếu sử dụng id người dùng chat trực tiếp tương đương id channel cho server, với server id là id người dùng 
vì vậy , mỗi người dùng là một server


User cần được giải quyết hai vấn đề cài đặt chính 
- Cách thiết kế cơ sở dữ liệu 
- Cách thiết kế api

 
Một channel có array của người dùng , cho phép tạo group chat.
    
# Day 6 

- Thông tin trong file này chỉ mang tính chất kĩ thuật

NEXT_PUBLIC_SITE_URL: Deployment url
Socket provider: Make sure its deployed .


- Để thực hiện việc handle messages :
    - API find messages
    - Display messages




Một message phải do một user hoặc một member , nên có hai đối tượng chung cấp truy cập nhưng phụ thuộc độc lập của một đối tượng message .

Vậy thì tốt nhất là xây hai đối tượng độc lập để ngăn chặn việc tạo đối tượng tự do

Nhớ phải query cả đối tượng khi select để gửi đi api

message list -> usechatquery -> useinfinitequery


// "use client"
// khong duoc dung use client o day , vi toan bo cac module dung db la server actions

// const profile = await currentUserProfile();

// if(!profile)
// {
//     return redirect("/");
// }

//bug vo han xay ra khi render doi tuong co chua ham async vi no render truoc khi item san sang , ke ca khi suspense duoc kich hoat