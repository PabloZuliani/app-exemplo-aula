import express from 'express';
import { Cidades, Especialidades, Medicos, sequelize, Usuarios } from './models/index.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Ok' });
});

//cadastro especialidades
app.post('/especialidades', async (req, res) => {
  try{
    const especialidades = await Especialidades.create(req.body);
    res.status(201).json(especialidades);
  } catch(error) {
    res.status(400).json({error: error.message})
  }
});

//buscar especialidades por id
app.get('/especialidades/:id', async (req, res) => {
  try{
    const especialidades = await Especialidades.findByPk(req.params.id);
    if (especialidades) {
      res.status(200).json(especialidades)
    } else {
      res.status(404).json({error: 'Especialidade não encontrada!'});
    }
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  });


app.get('/especialidades', async (req, res) => {
  try {
    const especialidades = await Especialidades.findAll();
    res.status(200).json(especialidades);
  } catch (error) {
    res.status(400).json({error: error.message})
  }
});

//deletando dados especialidade
app.delete('/especialidades/:id', async (req, res) => {
  try {
    const especialidade = await Especialidades.findByPk(req.params.id);
    if (especialidade) {
      await especialidade.destroy();
      res.status(200).json({message: 'Especialidade deletada com sucesso'});
    } else {
      res.status(404).json({error: 'Especialidade não encontrada'});
    }
  } catch (error) {
    res.status(500).json({error: error. message});
  }
});

//adicionando medicos 
app.post('/medicos', async (req, res) => {
  try{
    const medicos = await Medicos.create(req.body);
    res.status(201).json(medicos);
  } catch(error) {
    res.status(400).json({error: error.message})
  }
});

//buscar medicos por especialidade
app.get('/medicos/busca', async (req, res) => {
  try{
    const { EspecialidadesId, cidadeId} = req.query ;
    const where = {};
    if (EspecialidadesId) where.EspecialidadesId = EspecialidadesId;
    if (cidadeId) where.cidadeId = cidadeId;
    const medicos = await Medicos.findAll({
      where,
      include: [
        {model: Especialidades, as: 'Especilidade'},
        {model: Cidades, as: 'cidade'}
      ]
    });
    res.json(medicos)
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  });

//Buscando medicos 
app.get('/medicos', async (req, res) => {
  try {
  const medicos = await Medicos.findAll();
  res.status(200).json(medicos);
} catch (error) {
  res.status(400).json({error: error.message})
}
});

//deletando dados medicos
app.delete('/medicos/:id', async (req, res) => {
  try {
    const medicos = await Medicos.findByPk(req.params.id);
    if (medicos) {
      await medicos.destroy();
      res.status(200).json({message: 'Médico deletada com sucesso'});
    } else {
      res.status(404).json({error: 'Médico não encontrado'});
    }
  } catch (error) {
    res.status(500).json({error: error. message});
  }
});

//adicionando cidades
app.post('/cidades', async (req, res) => {
  try{
    const cidades = await Cidades.create(req.body);
    res.status(201).json(cidades);
  } catch (error) {
    res.status(400).json({error: error.message})
  }
});

//buscando cidades
app.get('/cidades', async (req, res) => {
  try{
    const cidades = await Cidades.findAll();
    res.status(200).json(cidades);
  } catch (error) {
    res.status(400).json({error: error.message})
  }
});

//deletando dados cidades
app.delete('/cidades/:id', async (req, res) => {
  try {
    const cidades = await Cidades.findByPk(req.params.id);
    if (cidades) {
      await Cidades.destroy();
      res.status(200).json({message: 'Cidade deletada com sucesso'});
    } else {
      res.status(404).json({error: 'Cidade não encontrada'});
    }
  } catch (error) {
    res.status(500).json({error: error. message});
  }
});

//adicionando usuarios
app.post('/usuarios', async (req, res) => {
  try{
  const usuarios = await Usuarios.create(req.body);
  res.status(201).json(usuarios);
} catch (error) {
  res.status(400).json({error: error.nessage})
}
});

//buscando usuarios
app.get('/ usuarios', async (req, res) => {
  try{
    const usuarios = await Usuarios.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(400).json({error: error.message})
  }
});

//deletando dados usuarios
app.delete('/usuarios/:id', async (req, res) => {
  try {
    const usuarios = await Usuarios.findByPk(req.params.id);
    if (usuarios) {
      await Usuarios.destroy();
      res.status(200).json({message: 'Usuario deletada com sucesso'});
    } else {
      res.status(404).json({error: 'Usuario não encontrada'});
    }
  } catch (error) {
    res.status(500).json({error: error. message});
  }
});


// Sincronizar banco de dados e iniciar servidor
sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado');
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch((error) => {
  console.error('Erro ao sincronizar banco de dados:', error);
});