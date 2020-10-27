import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
	const [repositories, setRepositories] = useState([]);

	async function handleAddRepository() {
		const repository = {
			title: "repository name",
			url: "repository url",
			techs: ["react", "native"],
		};

		const { data } = await api.post("repositories", repository);

		setRepositories([...repositories, data]);
	}

	async function handleRemoveRepository(id) {
		try {
			await api.delete(`repositories/${id}`);

			const repos = repositories.filter(
				(repository) => repository.id !== id
			);

			setRepositories(repos);
		} catch (error) {
			console.log(error.message);
		}
	}

	useState(() => {
		api.get("repositories").then((response) => {
			setRepositories(response.data);
		});
	}, []);

	return (
		<div>
			<ul data-testid="repository-list">
				{repositories.map((repository) => (
					<li key={repository.id}>
						{repository.title}

						<button
							onClick={() =>
								handleRemoveRepository(repository.id)
							}
						>
							Remover
						</button>
					</li>
				))}
			</ul>

			<button onClick={handleAddRepository}>Adicionar</button>
		</div>
	);
}

export default App;
