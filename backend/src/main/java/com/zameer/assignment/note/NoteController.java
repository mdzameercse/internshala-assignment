package com.zameer.assignment.note;

import com.zameer.assignment.user.User;
import com.zameer.assignment.user.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/notes")
@CrossOrigin(origins = "http://localhost:5173")
public class NoteController {

    private final NoteRepository noteRepository;
    private final UserRepository userRepository;

    public NoteController(NoteRepository noteRepository, UserRepository userRepository) {
        this.noteRepository = noteRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<NoteDto>> getNotes(Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow();
        List<Note> notes = noteRepository.findByUser(user);
        List<NoteDto> result = notes.stream()
                .map(n -> new NoteDto(n.getId(), n.getTitle(), n.getContent()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }

    @PostMapping
    public ResponseEntity<NoteDto> createNote(Authentication authentication, @RequestBody NoteDto dto) {
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow();
        Note note = new Note(dto.getTitle(), dto.getContent(), user);
        noteRepository.save(note);
        return ResponseEntity.ok(new NoteDto(note.getId(), note.getTitle(), note.getContent()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateNote(Authentication authentication, @PathVariable Long id, @RequestBody NoteDto dto) {
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow();
        Note note = noteRepository.findById(id).orElseThrow();
        if (!note.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).body("Not allowed");
        }
        note.setTitle(dto.getTitle());
        note.setContent(dto.getContent());
        noteRepository.save(note);
        return ResponseEntity.ok(new NoteDto(note.getId(), note.getTitle(), note.getContent()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNote(Authentication authentication, @PathVariable Long id) {
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow();
        Note note = noteRepository.findById(id).orElseThrow();
        if (!note.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).body("Not allowed");
        }
        noteRepository.delete(note);
        return ResponseEntity.ok().build();
    }
}
