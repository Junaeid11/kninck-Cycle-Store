"use client";

import { useState, useEffect } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Select from "react-select";
import { toast } from "sonner";
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
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";

import { getAllCategories } from "@/services/Category";
import { updateMealMenu } from "@/services/meal";

export default function UpdateProductForm({ product }: { product: any }) {
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagePreview, setImagePreview] = useState<string[]>(product?.imageUrls || []);
    const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);

    const form = useForm({
        defaultValues: {
            name: product?.name || '',
            description: product?.description || '',
            slug: product?.slug || '',
            brand: product?.brand || '',
            price: product?.price?.toString() || '',
            discountPrice: product?.discountPrice?.toString() || '',
            stock: product?.stock?.toString() || '',
            rating: product?.rating?.toString() || '',
            category: product?.category?._id || '',
            specs: {
                frame: product?.specs?.frame || '',
                brakes: product?.specs?.brakes || '',
                weight: product?.specs?.weight || '',
            },
            variants: {
                colors: product?.variants?.colors?.join(', ') || '',
                sizes: product?.variants?.sizes?.join(', ') || '',
            },
        }
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getAllCategories();
                setCategories(res.data);
            } catch (err) {
                console.error("Failed to fetch categories:", err);
            }
        };
        fetchCategories();
    }, []);

    const { formState: { isSubmitting } } = form;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const modifiedData = {
            ...data,
            price: parseFloat(data.price),
            discountPrice: parseFloat(data.discountPrice),
            stock: parseInt(data.stock),
            rating: parseFloat(data.rating),
            specs: {
                frame: data.specs.frame,
                brakes: data.specs.brakes,
                weight: data.specs.weight,
            },
            variants: {
                colors: data.variants.colors.split(',').map((color: string) => color.trim()),
                sizes: data.variants.sizes.split(',').map((size: string) => size.trim()),
            },
            category: data.category
        };

        try {
            const formData = new FormData();
            formData.append("data", JSON.stringify(modifiedData));
            imageFiles.forEach(file => formData.append("images", file));

            const res = await updateMealMenu(formData, product._id);
            if (res?.success) {
                toast.success(res.message);
                form.reset();
            } else {
                toast.error(res?.message || "Failed to update product.");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div className="rounded-xl flex-grow mx-2 p-5 my-5">
            <h1 className="text-xl text-center font-semibold mb-4 text-violet-500">Update Product</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { name: "name", label: "Product Name" },
                            { name: "description", label: "Description" },
                            { name: "slug", label: "Slug" },
                            { name: "brand", label: "Brand" },
                            { name: "price", label: "Price" },
                            { name: "discountPrice", label: "Discount Price" },
                            { name: "stock", label: "Stock" },
                            { name: "rating", label: "Rating" },
                        ].map(field => (
                            <FormField
                                key={field.name}
                                control={form.control}
                                name={field.name as 
                                    "name" | "description" | "slug" | "brand" | "price" | 
                                    "discountPrice" | "stock" | "rating"}
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
                        {["frame", "brakes", "weight"].map(key => (
                            <FormField
                                key={`specs.${key}`}
                                control={form.control}
                                name={`specs.${key}` as `specs.frame` | `specs.brakes` | `specs.weight`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{`Spec - ${key.charAt(0).toUpperCase() + key.slice(1)}`}</FormLabel>
                                        <FormControl>
                                            <Input {...field} value={field.value || ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}

                        {/* Variant Fields */}
                        {["colors", "sizes"].map(key => (
                            <FormField
                                key={`variants.${key}`}
                                control={form.control}
                                name={`variants.${key}` as `variants.colors` | `variants.sizes`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{`Variants - ${key}`}</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Comma separated" value={field.value || ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                    </div>

                    {/* Category Dropdown */}
                    <div>
                        <FormLabel className="text-sm font-medium">Category</FormLabel>
                        <Select
                            options={categories.map(cat => ({
                                value: cat._id,
                                label: cat.name
                            }))}
                            value={{
                                value: form.watch("category"),
                                label: categories.find(cat => cat._id === form.watch("category"))?.name || ""
                            }}
                            onChange={(opt) => form.setValue("category", opt?.value || "")}
                        />
                    </div>

                    {/* Image Uploader */}
                    {imagePreview.length > 0 ? (
                        <ImagePreviewer
                            setImageFiles={setImageFiles}
                            imagePreview={imagePreview}
                            setImagePreview={setImagePreview}
                        />
                    ) : (
                        <NMImageUploader
                            setImageFiles={setImageFiles}
                            setImagePreview={setImagePreview}
                            label="Upload Product Images"
                        />
                    )}

                    <Button type="submit" className="w-full mt-5" disabled={isSubmitting}>
                        {isSubmitting ? "Updating..." : "Update Product"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
