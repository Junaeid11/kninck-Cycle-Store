/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import { useEffect, useState } from "react";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import { addProducts } from "@/services/meal";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { getAllCategories } from "@/services/Category";

const Select = dynamic(() => import("react-select"), { ssr: false });

export default function CreateMealForm() {
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagePreview, setImagePreview] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<{ _id: string; name: string } | null>(null);


    const form = useForm();
    const { formState: { isSubmitting } } = form;


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const modifiedData = {
            name: data.name,
            brand: data.brand,
            price: parseFloat(data.price),
            discountPrice: parseFloat(data.discountPrice),
            isActive: data.isActive ?? true,
            slug: data.slug,
            category: selectedCategory?._id,
            description: data.description,
            quantity: parseInt(data.quantity),
            stock: parseInt(data.stock),
            specs: {
                wheelSize: data["specs.wheelSize"],
                frameMaterial: data["specs.frameMaterial"],
                brakes: data["specs.brakes"],
                ageRange: data["specs.ageRange"],
            },
            variants: {
                colors: data["variants.colors"]?.split(",").map((c: any) => c.trim()) || [],
                sizes: data["variants.sizes"]?.split(",").map((s : any) => s.trim()) || [],
            },
        };


        try {
            const formData = new FormData();
            formData.append("data", JSON.stringify(modifiedData));
            console.log(modifiedData)
            if (imageFiles.length > 0) {
                formData.append("images", imageFiles[0]);
            }

            const res = await addProducts(formData);
            console.log(res)

            if (res?.success) {
                form.reset();
                setSelectedTags([]);
                toast.success(res.message);
            } else {
                toast.error(res?.message);
            }
        } catch (err) {
            toast.error("An error occurred. Please try again.");
        }
    };
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await getAllCategories();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="rounded-xl flex-grow mx-10 p-5 my-5">
            <h1 className="text-2xl text-violet-400 text-center font-semibold mb-2">Create Meal</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {[
                            { name: "name", label: "Product Name" },
                            { name: "brand", label: "Brand" },
                            { name: "slug", label: "Slug" },
                            { name: "price", label: "Price" },
                            { name: "discountPrice", label: "Discount Price" },
                            { name: "quantity", label: "Quantity" },
                            { name: "stock", label: "Stock" },
                        ].map((field) => (
                            <FormField
                                key={field.name}
                                control={form.control}
                                name={field.name}
                                render={({ field: inputField }) => (
                                    <FormItem>
                                        <FormLabel>{field.label}</FormLabel>
                                        <FormControl>
                                            <Input {...inputField} value={inputField.value || ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                    </div>
                    <div className="mt-4">
                        <FormLabel>Category</FormLabel>
                        <Select
                            options={categories.map((category) => ({
                                value: category._id,
                                label: category.name,
                            }))}
                            onChange={(selectedOption: any) => {
                                setSelectedCategory(categories.find(cat => cat._id === selectedOption.value) || null);
                            }}
                            value={selectedCategory ? { value: selectedCategory._id, label: selectedCategory.name } : null}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value || ""} placeholder="Enter a product description" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />




                    {imagePreview.length > 0 ? (
                        <div>
                            <ImagePreviewer
                                setImageFiles={setImageFiles}
                                imagePreview={imagePreview}
                                setImagePreview={setImagePreview}
                                className="mt-8"
                            />
                        </div>
                    ) : (
                        <div className="mt-8">
                            <NMImageUploader
                                setImageFiles={setImageFiles}
                                setImagePreview={setImagePreview}
                                label="Upload Meal Image"
                            />
                        </div>
                    )}

                    <Button type="submit" className="mt-5 w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Creating..." : "Create Meal"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
