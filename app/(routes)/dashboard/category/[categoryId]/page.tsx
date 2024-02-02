



const CategoryPage = ({ params }: { params: { categoryId: string } }) => {
    return (
        <div>Category info for {params.categoryId}</div>
    )
};

export default CategoryPage;