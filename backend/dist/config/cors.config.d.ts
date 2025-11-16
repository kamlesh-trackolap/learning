declare const corsOptions: {
    origin: (origin: any, callback: any) => any;
    credentials: boolean;
    methods: string[];
    allowedHeaders: string[];
};
export default corsOptions;
