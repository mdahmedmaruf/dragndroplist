import { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import './App.css'

const shoppingProductItems = [
	{
		id: 'shoe',
		name: 'AweSome Shoes',
		thumb: '/images/shoe.jpg',
	},
	{
		id: 'bag',
		name: 'AweSome Bags',
		thumb: '/images/bag.jpg',
	},
	{
		id: 'watch',
		name: 'AweSome Watches',
		thumb: '/images/watch.jpg',
	},
	{
		id: 'glass',
		name: 'AweSome Glasses',
		thumb: '/images/glass.jpg',
	},
]

function App() {
	const [productItems, updateProductItems] = useState(shoppingProductItems)

	function handleOnDragEnd(result) {
		if (!result.destination) return

		const items = Array.from(productItems)
		const [reorderedItem] = items.splice(result.source.index, 1)
		items.splice(result.destination.index, 0, reorderedItem)

		updateProductItems(items)
	}
	return (
		<>
			<h1 className='title'>Choose Your Item with Drag & Drop</h1>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId='productItems'>
					{(provided) => (
						<ul
							className='products'
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{productItems.map(({ id, name, thumb }, index) => {
								return (
									<Draggable key={id} draggableId={id} index={index}>
										{(provided) => (
											<li
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
											>
												<div className='products-thumb'>
													<img src={thumb} alt={`${name} Thumb`} />
												</div>
												<p>{name}</p>
											</li>
										)}
									</Draggable>
								)
							})}
							{provided.placeholder}
						</ul>
					)}
				</Droppable>
			</DragDropContext>
		</>
	)
}

export default App
