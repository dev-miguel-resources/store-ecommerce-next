import Image from 'next/image'
import ProductCard from '@/app/(atoms)/components/ProductCard'
import { getCollectionDetails } from '@/lib/actions/actions'

const CollectionDetails = async ({
  params,
}: {
  params: { collectionId: string }
}) => {
  const collectionsDetails = await getCollectionDetails(params.collectionId)

  return (
    <div className="px-10 py-5 flex flex-col items-center gap-8">
      <Image
        src={collectionsDetails.image}
        width={1500}
        height={1000}
        alt="collection"
        className="w-full h-[400px] object-cover rounded-xl"
      />
      <p className="text-heading3-bold text-grey-2">
        {collectionsDetails.title}
      </p>
      <p className="text-body-normal text-grey-2 text-center max-w-[900px]">
        {collectionsDetails.description}
      </p>
      <div className="flex flex-wrap gap-16 justify-center">
        {collectionsDetails.products.map((product: ProductType) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default CollectionDetails

export const dynamic = 'force-dynamic'
